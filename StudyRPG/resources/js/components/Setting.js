    import axios from 'axios'
    import React, { Component } from 'react'

    class Setting extends Component {
      constructor (props) {
        super(props)
        
        this.state = {
            selected_subject: -2,
            subject_name: ''
        }
          
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.saveSubject = this.saveSubject.bind(this);
      }
        
      componentWillMount(){
        
        console.log("WIll");
        const data = {
          labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
            }
          ]
        };  
        
        this.setState({data: data});
    }
    
    componentDidMount () {  
        console.log("did");
        const data = {
          labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
            }
          ]
        };  
        this.setState({data: data});
    }
        
    onChangeSelect(event){
        console.log(event.target.value);
                
        this.setState({
            selected_subject: event.target.value
        });
    }
        
    onChangeHandler(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }
        
    saveSubject(){
        /*axios.get('/api/save/'+date+"/"+weight).then(response => {
             console.table(response.data); 
             
             this.setState({
                 date: "",
                 weight: 0
             });
             //this.setState({weights: response.data})
         })*/
    }
    
        
      render () {
        return (
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="box-border">
                        <div className="form-group">            
                            <label htmlFor="exampleFormControlSelect1">Fach</label>
                            <select name="subject" onChange={this.onChangeSelect} className="form-control" id="exampleFormControlSelect1">
                              <option value="-2">---</option>
                              <option value="-1">Neu</option>
                            </select>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                    <div className="box-border margin-top-10">

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Beschreibung</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Start</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Ende</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )
      }
    }

    export default Setting