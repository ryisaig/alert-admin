export default function getRandomString(length) {
    var s = '';
    do { s += Math.random().toString(36).substr(2); } while (s.length < length);
    s = s.substr(0, length);
    
    return s;
  }
  