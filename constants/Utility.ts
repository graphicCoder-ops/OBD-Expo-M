
export const API:string = 'http://52.91.130.47:8080';

export const doPostRequest = ()=>{

};

export const doGetRequest = async (url:string):Promise<Response>=>{
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      return await fetch(url, requestOptions);
};

export const seconds = (seconds:number)=>{
    return seconds*1000;
}