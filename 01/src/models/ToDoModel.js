import axios from 'axios'

const url = "http://localhost:3001"

// GESTION DES TODO DANS LA BDD


// Get Toutes les TODOs
export const getData = async () => {
    return await axios.get(url + '/ToDo')
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(error);
        });


}
// Get une TODO avec son id
export const getOne = async (id) => {
    return await axios.get(url + '/ToDo/' + id)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(error);
        });
}
// Add une TODO
export const addOne = async (title, state, desc, eventDate) => {
    await axios.post(url + '/ToDo/',
        {

            "title": title,
            "state": state,
            "entryDate": Date.now(),
            "desc": desc,
            "eventDate": eventDate
        }).then((res) => {
            return res
        })
}
// Suppr une TODO
export const deleteOne = async (id) => {

    return await axios.delete(url + '/ToDo/' + id)


}
// Met a jour la valeur d'une clé d'un objet TODO
export const updateOne = async (id, key, value, olderTask) => {

    olderTask[key] = value;


    return await axios.put(url + '/ToDo/' + id, { ...olderTask })



}