    import axios from 'axios'
    import React, { Component } from 'react'

class Setting extends Component {
    constructor (props) {
        super(props)

        this.state = {
            selected_subject: -2,
            subject_name: '',
            subjects: [],
            show_add: true,
            tasks: [],
            name: "",
            description: "",
            start: "",
            end: ""
        }

        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.saveSubject = this.saveSubject.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
    }

    componentWillMount(){
        //
    }

    componentDidMount () {  
        axios.get('/api/subjects').then(response => {
            console.table(response); 
            
            this.setState({subjects: response.data})
        })
    }
    
    updateTasks(subject_id){
        axios.get('/api/subject_tasks/'+subject_id).then(response => {
            this.setState({ tasks: response.data })
        })
    }

    onChangeSelect(event){
        //console.log(event.target.value);
        let subject_id = event.target.value;
        this.updateTasks(subject_id);
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
    
    saveTask(){
        const subject_id = this.state.selected_subject;
        const task_name = this.state.name;
        const task_description = this.state.description;
        const task_start = this.state.start;
        const task_ende = this.state.end;
        
        console.log("saveTask: "+subject_id+" "+task_name+" "+task_description+" "+task_start+" "+task_ende);
        
        axios.get('/api/new_task/'+subject_id+"/"+task_name+"/"+task_description+"/"+task_start+"/"+task_ende).then(response => {
            this.setState({ tasks: response.data })
         })
    }


    render () {
        
        const {subjects} = this.state;
        const {tasks} = this.state;
        
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
                                <div className="margin-top-10">
                                    <div className="form-group">
                                        <label htmlFor="inputName">Name</label>
                                        <input type="text" name="name" onChange={this.onChangeHandler} className="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Name der Aufgabe" />
                                        <small id="nameHelp" className="form-text text-muted">Ein aussagekräftiger Name für die Aufgabe.</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputDescription">Beschreibung</label>
                                        <input type="text" name="description" onChange={this.onChangeHandler} className="form-control" id="inputDescription" aria-describedby="descriptionHelp" placeholder="Kurze Beschreibung" />
                                        <small id="descriptionHelp" className="form-text text-muted">Eine kurze Beschreibung.</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputStart">Start</label>
                                        <input type="text" name="start" onChange={this.onChangeHandler} className="form-control" id="inputStart" aria-describedby="startHelp" placeholder="Wann beginnt diese Aufgabe" />
                                        <small id="startHelp" className="form-text text-muted">Startdatum der Aufgabe</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputEnde">Ende</label>
                                        <input type="text" name="end" onChange={this.onChangeHandler} className="form-control" id="inputEnde" aria-describedby="endeHelp" placeholder="Wann endet diese Aufgabe" />
                                        <small id="endeHelp" className="form-text text-muted">Enddatum der Aufgabe.</small>
                                    </div>
                                    
                                    <button className="btn btn-primary" onClick={this.saveTask}>Speichern</button>
                             
                                </div>
                            }
                     
                            {this.state.show_add == false && 
                                <div className="margin-top-10">
                                    <ul className="list-group">
                                        {tasks.map((item, key) => 
                                            <li key={key} className="list-group-item">
                                                {item.name}
                                            </li>
                                        )}
                                    </ul>
                                </div>
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