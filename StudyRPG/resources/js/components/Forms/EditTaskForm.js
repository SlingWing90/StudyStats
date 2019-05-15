import axios from 'axios'
import React, { Component } from 'react'
import PropTypes from 'prop-types'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTaskForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            tasks: [],
            task_id: 0,
            name: "",
            description: "",
            start: "",
            end: "",
            picker_start: "",
            picker_end: "",
            show_task: -1,
            done: 0
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        
        this.formatDate = this.formatDate.bind(this);
        
        this.onTaskClick = this.onTaskClick.bind(this); //(key)
        
        this.updateTaskList = this.updateTaskList.bind(this);
        
        this.changeDone = this.changeDone.bind(this);
        
        this.saveTask = this.saveTask.bind(this); 
    }

    componentWillMount(){
    }

    componentDidMount () {  
        this.updateTaskList();
    }
    
    componentDidUpdate(prevProps){
        if(this.props.subject_id != prevProps.subject_id){
            this.updateTaskList();
        }
    }
    
    formatDate(date){
        
        let _date = new Date(date);
        
        let year = _date.getFullYear();
        let month = _date.getMonth()+1;
        let day = _date.getDate();
        
        let hours = _date.getHours();
        let minutes = _date.getMinutes();
        let seconds = _date.getSeconds();
        
        if(day < 10){
            day = "0"+day; 
        }
        
        if(month < 10){
            month = "0"+month;
        }
        
        if(hours < 10){
            hours = "0"+hours;
        }
        
        if(minutes < 10){
            minutes = "0"+minutes;
        }
        
        if(seconds < 10){
            seconds = "0"+seconds;
        }
        
        let format_date = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        
        return format_date;
    }
    
    onTaskClick(task_key, data){
        //console.log(task_key);
        console.table(data);
        this.setState({
            show_task: task_key,
            
            task_id: data.id,
            name: data.name,
            description: data.description,
            start: data.start,
            end: data.end,
            picker_start: false,
            picker_end: false,
            done: data.done
        })
    }
        
    updateTaskList(){
        let subject_id = this.props.subject_id;
        axios.get('/api/subject_tasks/'+subject_id).then(response => {
            this.setState({ tasks: response.data })
        })
    }
    
    onStartDateChange(start_date){
        
        let format_date = this.formatDate(start_date);
        
        console.log(this.formatDate(start_date));
        
        this.setState({start: format_date});
        this.setState({picker_start: start_date});
    }
    
    onEndDateChange(end_date){
        
        let format_date = this.formatDate(end_date);
        
        this.setState({end: format_date});
        this.setState({picker_end: end_date});
    }
    
    onChangeHandler(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    
    changeDone(doneState){
        this.setState({
                        done: !doneState
                     })
    }
    
    saveTask(){
        let task_id = this.state.task_id;
        let name = this.state.name;
        let description = this.state.description;
        let start = this.state.start;
        let end = this.state.end;
        let done = this.state.done;
        
        console.log(task_id+" "+name+" "+description+" "+start+" "+end+" "+done);
        
        axios.get('/api/update_task/'+task_id+"/"+name+"/"+description+"/"+start+"/"+end+"/"+done).then(response => {
            this.updateTaskList();
            //this.setState({ tasks: response.data })
        })
    }
    
    render () {
        
        const {tasks} = this.state;
        
        return (
            <div className="margin-top-10">
                <ul className="list-group">
                    {tasks.map((item, key) => 
                        <li key={key} className="list-group-item">
                            <strong onClick={() => this.onTaskClick(key, item)}>{item.name}</strong>
                            <div style={{display: (this.state.show_task == key ? 'block' : 'none')}}>
                                <hr />
                                <div className="form-group">
                                    <label htmlFor="inputName">Name</label>
                                    <input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler} className="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Name der Aufgabe" />
                                    <small id="nameHelp" className="form-text text-muted">Ein aussagekräftiger Name für die Aufgabe.</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputDescription">Beschreibung</label>
                                    <input type="text" name="description" value={this.state.description} onChange={this.onChangeHandler} className="form-control" id="inputDescription" aria-describedby="descriptionHelp" placeholder="Kurze Beschreibung" />
                                    <small id="descriptionHelp" className="form-text text-muted">Eine kurze Beschreibung.</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputStart">Start</label>

                                    <DatePicker
                                        selected={this.state.picker_start}
                                        onChange={this.onStartDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        dateFormat="dd-MM-yyyy HH:mm"
                                        strictParsing
                                        className="form-control"
                                        placeholderText="Klicken zum auswählen des Starts" 
                                    />

                                    <small id="startHelp" className="form-text text-muted">Startdatum der Aufgabe</small>
                                </div> 

                                <div className="form-group">
                                    <label htmlFor="inputEnde">Ende</label>

                                    <DatePicker
                                        selected={this.state.picker_end}
                                        onChange={this.onEndDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        dateFormat="dd-MM-yyyy HH:mm"
                                        strictParsings
                                        className="form-control"
                                        placeholderText="Klicken zum auswählen des Endes" 
                                    />

                                    <small id="endeHelp" className="form-text text-muted">Enddatum der Aufgabe.</small>
                                </div>

                                <div className="form-group">
                                    <input type="checkbox" onChange={() => this.changeDone(this.state.done)} className="form-check-input" id="inputDone" checked={this.state.done == 1 ? 'checked' : ''} />
                                        
                                    <label className="form-check-label" htmlFor="inputDone">
                                        Erledigt
                                    </label>
                                </div>

                                <button className="btn btn-primary" onClick={this.saveTask}>Speichern</button>

                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

EditTaskForm.propTypes = {
  subject_id: PropTypes.number.isRequired
};

export default EditTaskForm