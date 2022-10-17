import React from 'react'
import { baseUrl } from '../utils/constants'

const useGetData = (url='', method='GET', body ) => {
	const [state, setState] = React.useState(
		{
			isLoading: false,
			hasError: false,
			data: [],
		}
	)

	const options = {
		method: method,
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		body
	}

	React.useEffect(() => {
		const getData = async () => {
			try {
				setState({ ...state, hasError: false, isLoading: true })
				const res = await fetch(`${baseUrl}${url}`, options)
				if (res.ok) {
					const {success, data} = await res.json()
					success && setState({ ...state, data, isLoading: false })
				} else {
					setState({ ...state, hasError: true, isLoading: false })
				}
			} catch (error) {
				setState({ ...state, hasError: true, isLoading: false })
			}
		}
		getData()
		// eslint-disable-next-line
	}, [])

	return state
}

export default useGetData