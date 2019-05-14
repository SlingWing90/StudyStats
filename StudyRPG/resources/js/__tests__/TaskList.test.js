import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import TaskList from '../components/TaskList';
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({adapter: new Adapter()});

describe('<TaskList />', () => {
    it('renders <TaskList /> component with empty props without crashing', () => {
        const clickFn = jest.fn();
        const component = shallow(<TaskList tasks={[]} onDoneClick={clickFn} />);  
        
        expect(component.find('.list-group-item')).toHaveLength(0);   
        expect(component).toMatchSnapshot();
    });
    
    it('renders <TaskList /> component with two tasks', () => {
        const clickFn = jest.fn();
        
        // 2 Tasks
        const test_tasks = [{"id":17,"subject_id":1,"name":"Sint debitis nihil","description":"Corporis modi","start":"2018-06-05 00:00:00","end":"2018-08-21 00:00:00","finished":"2019-06-18 00:00:00","done":0,"created_at":"2019-05-14 08:17:21","updated_at":"2019-05-14 08:17:21"},{"id":2,"subject_id":4,"name":"Harum deserunt accusantium","description":"Et quibusdam nemo","start":"2018-07-24 00:00:00","end":"2018-09-25 00:00:00","finished":"2019-04-09 00:00:00","done":0,"created_at":"2019-05-14 08:17:21","updated_at":"2019-05-14 08:17:21"}];
        
        const component = shallow(<TaskList tasks={test_tasks} onDoneClick={clickFn} />);
        
        // could be li or .list-group-item - li better?
        expect(component.find('.list-group-item')).toHaveLength(2);
    });
});