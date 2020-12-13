import { loadavg } from 'os';
import React, {useRef} from 'react';
import { useDispatch } from 'react-redux';
import {actionsState} from '../store/store.js';
import './LoadForm.css';

const LoadForm = ()=>{

    const jsonRef = useRef(null);
    const stlRef = useRef(null);

    const dispatch = useDispatch();

    const sendForm = (event)=>{
        event.preventDefault();
        if(jsonRef.current.files.length > 0){
          const reader = new FileReader();
          reader.onload = function(){
            const json = JSON.parse(reader.result);
            dispatch(actionsState.setJson(json));
          };
          reader.readAsText(jsonRef.current.files[0]);
        }
    }

    return (
        <div className="load-buttons-block">
          <form onSubmit={sendForm}>
            <label forHtml="jsonf">выберите json файл</label>
            <input ref={jsonRef} type="file" id="jsonf" name="json" accept=".json"/>
            <label forHtml="stlf">выберите stl файл</label>
            <input ref={stlRef} type="file" id="stlf" name="model" accept=".stl"/>
            <button type="submit">Загрузить</button>
          </form>
        </div>
    )
}

export default LoadForm;