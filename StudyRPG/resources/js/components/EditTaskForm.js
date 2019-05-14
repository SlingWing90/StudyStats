import axios from 'axios'
import React, { Component } from 'react'
import PropTypes from 'prop-types'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTaskForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            tasks: []
        }
        
        this.updateTaskList = this.updateTaskList.bind(this);

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
        
    updateTaskList(){
        let subject_id = this.props.subject_id;
        axios.get('/api/subject_tasks/'+subject_id).then(response => {
            this.setState({ tasks: response.data })
        })
    }
    
    render () {
        
        const {tasks} = this.state;
        
        return (
            <div className="margin-top-10">
                <ul className="list-group">
                    {tasks.map((item, key) => 
                        <li key={key} className="list-group-item">
                            {item.name}
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