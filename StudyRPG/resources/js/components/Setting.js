import axios from 'axios'
import React, { Component } from 'react'
import NewTaskForm from "./NewTaskForm";
import EditTaskForm from "./EditTaskForm";


class Setting extends Component {
    constructor (props) {
        super(props)

        this.state = {
            selected_subject: -2,
            subject_name: '',
            subjects: [],
            show_add: true,
        }

        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.saveSubject = this.saveSubject.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        
    }

    componentWillMount(){
        //
    }

    componentDidMount () {  
        axios.get('/api/subjects').then(response => {
            this.setState({subjects: response.data})
        })
    }
    
    onChangeSelect(event){
        //console.log(event.target.value);
        let subject_id = event.target.value;
        //this.updateTasks(subject_id);
        this.setState({
            selected_subject: event.target.value
        });
    }

    onChangeHandler(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    
    onClickHandler(val){
        //console.table(event.target);
        console.log(val);
        
        this.setState({
            show_add: val
        });
    }
    
    saveSubject(){
        const subject_name = this.state.subject_name;
        
        axios.get('/api/new_subject/'+subject_name).then(response => {
             this.setState({
                 subjects: response.data
             });
         })
    }
    
    render () {
        
        const {subjects} = this.state;
        
        return (
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="box-border">
                        <div className="form-group">            
                            <h4>Fach</h4>
                            <select name="subject" onChange={this.onChangeSelect} className="form-control" id="exampleFormControlSelect1">
                              <option value="-2">---</option>
                              <option value="-1">Neu</option>
                              {subjects.map((item, key) => 
                                <option value={item.id} key={key}>{item.name}</option>
                              )}
                            </select>
                            <small id="emailHelp" className="form-text text-muted">Fach auswählen oder neues Fach anlegen</small>
                        </div>


                        {this.state.selected_subject == -1 &&
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Neues Fach anlegen</label>
                                    <input type="text" value={this.state.subject_name} name="subject_name" onChange={this.onChangeHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <button onClick={this.saveSubject} className="btn btn-primary">Speichern</button>
                            </div>

                        }
                    </div>

                    {this.state.selected_subject >= 0 &&
                        <div className="box-border margin-top-10">
                            <h4>Aufgaben</h4>
                            <nav className="nav">
                                <button className={this.state.show_add ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.onClickHandler(true)}>Anlegen</button>
                                <button className={!this.state.show_add ? 'btn btn-primary' : 'btn btn-default' } onClick={() => this.onClickHandler(false)}>Bearbeiten</button>
                            </nav>
                     
                     
                            {this.state.show_add == true && 
                                <NewTaskForm subject_id={Number(this.state.selected_subject)} />
                            }
                     
                            {this.state.show_add == false && 
                                <EditTaskForm subject_id={Number(this.state.selected_subject)} />
                            }
                     
                        </div> 
                    }
 
                </div>
             </div>
          </div>
        )
    }
}

    export default Setting