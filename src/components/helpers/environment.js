let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3002';
        break
    case 'synth-time.herokuapp.com':
        APIURL = 'https://synthtime.herokuapp.com'
}

export default APIURL;