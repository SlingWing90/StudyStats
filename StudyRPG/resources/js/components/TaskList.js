    import axios from 'axios'
    import React, { Component } from 'react'
    import PropTypes from 'prop-types'; 

    class TaskList extends Component {
      constructor (props) {
          super(props);
          
          this.state = {
              timeLeft: []
          }
          
          this.handler = this.handler.bind(this);
          this.calculateCountdown = this.calculateCountdown.bind(this);
          this.formatCountdown = this.formatCountdown.bind(this);
          this.timePercentage = this.timePercentage.bind(this);
      }
      
        
      calculateCountdown(endDate){
          let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
          
          if(diff <= 0){
              return false;
          }
          
          const timeLeft = {
              years: 0,
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0
          }
          
          if(diff >= (365 * 86400)){
              timeLeft.years = Math.floor(diff / (365 * 86400));
              diff -= timeLeft.years * 365 * 86400;
          }
          
          if(diff >= 86400){
              timeLeft.days = Math.floor(diff / (86400));
              diff -= timeLeft.days * 86400;
          }
          
          if(diff >= 3600){
              timeLeft.hours = Math.floor(diff / (3600));
              diff -= timeLeft.hours * 3600;
          }
          
          if(diff >= 60){
              timeLeft.minutes = Math.floor(diff / (60));
              diff -= timeLeft.minutes * 60;
          }
          
          timeLeft.seconds = diff;
          
          // this.setState({timeLeft: timeLeft});
          return timeLeft;
          
          //console.log(days);
      }
        
      formatCountdown(end){
          const timeLeft = this.calculateCountdown(end);
          
          //console.log(timeLeft);
          let timeLeftString = "";
          if(timeLeft != false){
              timeLeftString = "Noch ";
          }else{
              timeLeftString = "Abgelaufen!";
          }
          
          if(timeLeft.years > 0){
              timeLeftString += timeLeft.years+" Jahre";
          }
          if(timeLeft.days > 0){
              timeLeftString += " "+timeLeft.days+" Tage";
          }
          if(timeLeft.hours > 0){
              timeLeftString += " "+timeLeft.hours+" Stunden";
          }          
          if(timeLeft.minutes > 0){
              timeLeftString += " "+timeLeft.minutes+" Minuten";
          } 
          if(timeLeft.seconds > 0){
              timeLeftString += " "+timeLeft.seconds+" Sekunden";
          } 
          
          
          return timeLeftString; //timeLeft.days+" Tage "+timeLeft.hours
      }
        
      timePercentage(start, end){
          //let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
          let endDate = Date.parse(new Date(end));
          let startDate = Date.parse(new Date(start));
          let actDate = Date.parse(new Date());
          
          let left = endDate - actDate;
          let total = endDate - startDate;
          
          //const percentage = 100 - ((left / total) * 100);
          
          const percentage = 100 - (100 / total) * left;
          
          if(percentage >= 100){
              return 100;
          }
          
          return percentage;
      }
        
      handler(e){
          this.props.onDoneClick(e);
      }
        
      render () {
          
        const {tasks} = this.props
          
        return (
          <div className="col-md-6">
            <h2 className="text-center">Aufgaben</h2>
            <ul className="list-group task-list">   
                {tasks.map((item, key) =>
                    <li className="list-group-item" key={key}>
                        <strong>{item.name}</strong>
                        <div>
                            {item.description}
                        </div>
                        <div>
                            <div className="progressbar">
                                <div className="bar" style={{width: this.timePercentage(item.start, item.end)+"%"}}>
                                </div>
                            </div>
                            <small className="duration-text">{this.formatCountdown(item.end)}</small>
                        </div>
                        
                        <button type="button" onClick={() => this.handler(key)} className="btn btn-primary margin-top-10">Erledigt</button>
                    </li>
                )}
            </ul>
        </div>
        )
      }
    }
    
    TaskList.propTypes = {
      tasks: PropTypes.array,
      onDoneClick: PropTypes.func
    };

    export default TaskList