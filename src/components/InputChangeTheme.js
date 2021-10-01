import React from 'react'
import axios from 'axios'
import { useState, useEffect, useReducer } from 'react';
import ButtonChangeTheme from '../components/ButtonChangeTheme'

const InputChangeTheme = () => {


    const reducer = (state, action) => {
        console.log(state, action)

        if(action.type === 'CAMBIO_VISIBILITA_COMPONENTI') {
            return {
                ...state, //ritorno tutto state + la modifica sottostante
                isShow: true
            }
        }
        return state; //Lo stato va ritornato obbligatoriamente
    }

    const initialState = {
        isShow: false
    }
    

    const url = 'https://opentdb.com/api.php?amount=1&difficulty=easy';
    
    //hooks useState
    const [objectFromApi, setobjectFromApi] = useState([]);
    const [answer, setAnswer] = useState("");
    //const [show, setShow] = useState(false);

    //hooks useReducer (An example)
    const [state, dispatch] = useReducer(reducer, initialState)

    const setShow = () => {
        dispatch({type: 'CAMBIO_VISIBILITA_COMPONENTI'})
    }

    //call api for get question
    const getQuestion = async () => {
        const result = await axios.get(url);
        setobjectFromApi(result.data.results);
        console.log(result)

    };


    //use useEffect hook
    useEffect(() => {
        getQuestion();
      }, []);

    
      const handleChange = (e) => {
          const { value } = e.target
         setAnswer(value)
      }
      //handle submit and check the answer
    const handleSubmit = (e) => {
        e.preventDefault();

        if (answer &&  answer === objectFromApi[0].correct_answer) {
            console.log('Top');
            //setShow(true);
            setShow();
        } else {
            alert('Noooo - :(');
            getQuestion();
        }
    }

    return (
        <>
        <div className='container col-6 py-4 shadow offset-3'>
            <div className='item'>
                <h3>{objectFromApi.map((el) => {
                    return(el.question)
                })}</h3>
            </div>
            <form>
                <label htmlFor='answer' className='py-2'> Write the answer </label>
                <input type='text' id='answer' className='form-control' value={answer} name='answer' onChange={handleChange} disabled={state.isShow}></input>
                <button type="submit" className='btn btn-success mt-3 offset-3 col-6' onClick={handleSubmit} disabled={state.isShow}>Invia</button>
            </form>
        </div>

            { state.isShow ?  <ButtonChangeTheme /> : null }
       
        </>
    )
}

export default InputChangeTheme
