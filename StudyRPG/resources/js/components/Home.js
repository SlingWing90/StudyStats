import axios from 'axios'
import React, { Component } from 'react'
import {Radar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import TaskList from './TaskList'

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            radar_data: [],
            line_data: [],
            tasks: []
        }

        this.doneTask = this.doneTask.bind(this);
        this.updateRadar = this.updateRadar.bind(this);
        this.updateLine = this.updateLine.bind(this);
    }

    componentWillMount(){
        let data = {
          labels: [],
          datasets: [
            {
              label: 'Fortschritt in %',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: []
            }
          ]
        };
        
        this.setState({radar_data: data});
        
        /*Line preset*/
        this.setState({line_data: data});
        
    }

    componentDidMount () {  
        this.updateRadar();
        this.updateLine();
        
        // Load undone tasks
        axios.get('/api/tasks/0').then(response => {
            this.setState({tasks: response.data})
        })

    }
    
    updateLine(){
        
        let data = {
          labels: [],
          datasets: [
            {
              label: 'Verlauf',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: []
            }
          ]
        };
        
        // Load finished tasks from server
        axios.get("/api/process").then(response => {
            let label_array = [];
            let data_array = [];
            
            response.data.map((d) => label_array.push((d.month < 10 ? "0" : "")+d.month+"."+d.year) );
            response.data.map((d) => data_array.push(d.c) );

            data.labels = label_array;
            data.datasets[0].data = data_array;

            this.setState({line_data: data});
        });
        
        //this.setState({line_data: this.state.radar_data});
    }
    
    updateRadar(){
        // Initialize Data for Graph
        let data = {
          labels: [],
          datasets: [
            {
              label: 'Fortschritt in %',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: []
            }
          ]
        };

        // Load finished tasks from server
        axios.get("/api/subjects_tasks_done").then(response => {
            let label_array = [];
            let data_array = [];
                        
            response.data.map((d) => label_array.push(d.name) );
            response.data.map((d) => data_array.push(d.c) );

            data.labels = label_array;
            data.datasets[0].data = data_array;

            this.setState({radar_data: data});
        });
    }

    doneTask(task_key){
        let task_list = this.state.tasks;
        let task_data = this.state.tasks[task_key];
        let task_id = task_data.id; 
        
        axios.get("/api/done/"+task_id).then(response => {
            var arr = [...this.state.tasks];
            arr.splice(task_key, 1); 
            this.setState({tasks: arr}); 
            this.updateRadar();
            this.updateLine();
        });
    }

    // state.tasks: Redux would be much better...
    render () {
        
        const radar_options = {
                                legend: {
                                            display: true
                                        },
                                scale:{
                                            ticks:{
                                                    min:0,
                                                    max:100
                                            }
                                }
                            };
        
        const line_options =    {
                                    scales: {
                                            yAxes:[{
                                                ticks:{
                                                    beginAtZero: true
                                                }
                                            }]
                                    }
                                };
        
        return (
          <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-center">Fortschritt</h2>
                    <div className="box-border">
                        <Radar options={radar_options} data={this.state.radar_data} />
                    </div>
            
                    <div className="box-border margin-top-10">
                        <Line options={line_options} data={this.state.line_data} />
                    </div>
                </div>
                <TaskList tasks={this.state.tasks} onDoneClick={this.doneTask} />
            </div>

        </div>
        )
    }
}

export default Home