import axios from 'axios'
import React, { Component } from 'react'
import {Radar} from 'react-chartjs-2';
import TaskList from './TaskList'

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            tasks: []
        }

        this.doneTask = this.doneTask.bind(this);
        this.updateRadar = this.updateRadar.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount () {  

        this.updateRadar();

        // Load undone tasks
        axios.get('/api/tasks/0').then(response => {
            this.setState({tasks: response.data})
        })

    }
    
    updateRadar(){
        // Initialize Data for Graph
        let data = {
          labels: [],
          datasets: [
            {
              label: 'Radar',
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

            this.setState({data: data});
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
        });
    }

    // state.tasks: Redux would be much better...
    render () {
        return (
          <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-center">Fortschritt</h2>
                    <div className="box-border">
                        <Radar options={{legend:{display: false},scale:{ticks:{min:0,max:100}}}} data={this.state.data} />
                    </div>
                </div>
                <TaskList tasks={this.state.tasks} onDoneClick={this.doneTask} />
            </div>

        </div>
        )
    }
}

export default Home