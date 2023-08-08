import {check, group} from "k6";
import http from "k6/http"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: 1000,
        iterations: 3500,
        maxDuration: '2s',
      },
    },
  };  

export default function(){
    group ('Reqres Create user', () =>{
        let url  = ('https://reqres.in/api/users')
        let body = JSON.stringify ({
    
                "name" : "morpheus",
                "job"  : "leader"
        })
        
        let response1 = http.post(url,body)
        
        console.log(JSON.stringify(response1.body))
        check (response1, {
            'is status 201' : (r) => r.status == 201
        })

    })

    group ('Reqres Update Data user', () =>{
        let url  = ('https://reqres.in/api/users/2')
        let body = JSON.stringify ({
    
                "name" : "morpheus",
                "job"  : "zion resident"
        })
        
        let response2 = http.put(url,body)
        
        console.log(JSON.stringify(response2.body))
        check (response2, {
            'is status 200' : (r) => r.status == 200
        })

    })


}

export function handleSummary(data) {
    return {
      "case2-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }