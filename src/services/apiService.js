import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXJjaGFudCI6IjZkMzI5Nzk3LWI2NGQtNDdkMS1hNDU3LTQ3OThlMmIzNjFiNSIsImdvZFVzZXIiOmZhbHNlLCJzdWIiOiI0ODI3ODAzNi1jYzE5LTQ3YWItYTgyOC03MzRiOWUxYWNlMDIiLCJpc3MiOiJodHRwOi8vYXBpZGVtby5mYXR0bGFicy5jb20vdGVhbS9hcGlrZXkiLCJpYXQiOjE1NTU0Mjg2MzMsImV4cCI6NDcwOTAyODYzMywibmJmIjoxNTU1NDI4NjMzLCJqdGkiOiJxZTNueklKdWlDOFhKN1dhIiwiYXNzdW1pbmciOmZhbHNlfQ.TEmlwmgVBLwt5x0FO4c-mbY3JgO_tgxcFRfznlOGSrM'

const API_BASE_URL = "https://apidemo.fattlabs.com"

export default {
  // create invoice
  createInvoice: (invoiceData) => {
    return axios.post(`${API_BASE_URL}/invoice`, invoiceData)
  },
  // create item list
  getItems: (currentPage) => {
    if (currentPage) {
      return axios.get(`${API_BASE_URL}/item?name&page=${currentPage + 1}`)
    }
    else {
      return axios.get(`${API_BASE_URL}/item/?name`)
    }
  },
  // create customer list 
  getCustomers: (currentPage) => {
    // return axios.get(`${API_BASE_URL}/customer`)
    if (currentPage) {
      return axios.get(`${API_BASE_URL}/customer?page=${currentPage + 1}`)
    }
    else {
      return axios.get(`${API_BASE_URL}/customer`)
    }
  },

};
