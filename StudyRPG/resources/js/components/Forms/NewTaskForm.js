import axios from 'axios'
import React, { Component } from 'react'
import PropTypes from 'prop-types'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewTaskForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            name: "",
            description: "",
            start: "",
            end: "",
            picker_start: "",
            picker_end: ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.saveTask = this.saveTask.bind(this);
        
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        
        this.formatDate = this.formatDate.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount () {  
    }
    
    onChangeHandler(event){
        this.setState({
            [event.target.name] : event.target.value
        });
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
    
    saveTask(){
        const subject_id = this.props.subject_id; // this.state.selected_subject;
        const task_name = this.state.name;
        const task_description = this.state.description;
        const task_start = this.state.start;
        const task_ende = this.state.end;
        
        console.log("saveTask: "+subject_id+" "+task_name+" "+task_description+" "+task_start+" "+task_ende);
        
        axios.get('/api/new_task/'+subject_id+"/"+task_name+"/"+task_description+"/"+task_start+"/"+task_ende).then(response => {
            
            
            
            this.setState({ tasks: response.data,
                            name: "",
                            description: "",
                            start: "",
                            end: "",
                            picker_start: "",
                            picker_end: ""
                          });
         })
    }


    render () {
        
        const {subjects} = this.state;
        const {tasks} = this.state;
        
        return (
            <div className="margin-top-10">
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

                <button className="btn btn-primary" onClick={this.saveTask}>Speichern</button>

            </div>
        )
    }
}

NewTaskForm.propTypes = {
  subject_id: PropTypes.number.isRequired
};

export default NewTaskForm