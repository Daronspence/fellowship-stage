
// https://api.planningcenteronline.com/services/v2/service_types/54564/plans?filter=future

const axios = require('axios')

const username = process.env.PCO_USERNAME;
const passw = process.env.PCO_PASSWORD;

const url = "https://api.planningcenteronline.com/services/v2/service_types/54564/plans?filter=future";


const instance = axios.create({
    baseURL: 'https://api.planningcenteronline.com/services/v2',
    timeout: 3000,
    // headers: {'Authorization': 'Basic ' + new Buffer(username + ':' + passw).toString('base64') },
    auth: {
        username: username,
        password: passw
    }
});


exports.handler = (event, context, callback) => {
    instance.get('service_types/54564/plans?filter=future')
        .then(function(response){
            // console.log(response)
            // console.log(event) // info about the request
            if ( response.status === 200 ){
                let nextServiceId = response.data.data[0].id || null;
                if (nextServiceId) {
                    instance.get(`service_types/54564/plans/${nextServiceId}/team_members?include=team&per_page=100`)
                        .then(function(response){
                            callback(null, {
                                statusCode: 200,
                                body: JSON.stringify(response.data),
                            });
                        })
                        .catch(function(error){
                            callback(error)
                        })
                }
            } else {
                callback(null, {
                    statusCode: response.status,
                    body: JSON.stringify(response.data)
                })
            }

        })
        .catch(function(error){
            callback(error)
        })
}