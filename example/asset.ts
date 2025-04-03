
  import { decodeBase64 } from "jsr:@std/encoding@~1.0.8";
  
  const bundledObject = {
    files:{
      "test-text":{
      content:decodeBase64("SGVsbG8gV29ybGQhIQ=="),
      extension: "txt"
    },
    "test-text2":{
      content:decodeBase64("SGVsbG8gV29ybGQhIQ=="),
      extension: "txt"
    }
    }
  } 
  export default bundledObject;

