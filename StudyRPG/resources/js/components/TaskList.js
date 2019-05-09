    import axios from 'axios'
    import React, { Component } from 'react'
    import PropTypes from 'prop-types'; 

    class TaskList extends Component {
      constructor (props) {
          super(props);
          this.handler = this.handler.bind(this);
      }
      
        
      handler(e){
          this.props.onDoneClick(e);
      }
        
      render () {
          
        const {tasks} = this.props
          
        return (
          <div className="col-md-6">
            <h2 className="text-center">Aufgaben</h2>
            <ul className="list-group">   
                {tasks.map((item, key) =>
                    <li className="list-group-item" key={key}>
                        {item.name} - X days left
                        <div>
                            {item.description}
                        </div>
                        <div>
                            <div className="progressbar">
                                <div className="bar" style={{width: "50%"}}>
                                </div>
                            </div>
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