import {fetchNoToken, fetchWithToken} from '../../helpers/fetch'

describe('Testing fetch helpers', () => { 
    let token = ''

    test('fetchNoToken should work', async() => { 
        const res = await fetchNoToken('auth', {
             email: 'email12@test.com', 
             password: '123456' 
        }, 'POST')

        const body = await res.json()

        expect(res instanceof Response).toBe(true)
        token = body.data.token
     })

     test('fetchWithToken should work', async() => { 
        localStorage.setItem('token', token)

        const res = await fetchWithToken('events/test1234', {}, 'DELETE')
        const body = await res.json()
        
        expect(body.msg).toBe('Error on delete event')       
     }) 
})