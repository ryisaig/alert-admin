import React from 'react';
import axios from 'axios'
import GenericRequest from '../utils/GenericRequest';
import { BASE_SERVER_URL } from '../utils/BaseServerUrl';



export function GetActiveCourses(){

}

export function GetAllCourses(){

}

export function GetCourseById(id, callback){
    axios.get(BASE_SERVER_URL + 'course/'+id,  { params: {...GenericRequest()}})
    .then(res => {
        callback(res);
    });
}