import useHttp from "../hooks/http.hook"

const api = 'https://test-task-unek.herokuapp.com/api/'

const Service = () => {
    const {request} = useHttp()

    const getData = async () => await request(api + 'getData')

    const addData =  async (form) => await request(api + 'addData', 'post', null, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        form: JSON.stringify(form)
    })

    const dataDelete = async (id) => await request(api + `deleteData/${id}`, 'post')

    const dataEdit = async (id, form) => await request(api + `editData/${id}`, 'post', form)

    const login = async (form) => await request(api + 'auth/login', 'post', form)

    const register = async (form) => await request(api + 'auth/register', 'post', form)

    return {getData, addData, dataDelete, dataEdit, login, register}
}

export default Service