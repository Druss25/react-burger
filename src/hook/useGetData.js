import React from 'react'
import { urlAPI_ingredient } from '../utils/constants'

const useGetData = () => {
	const [state, setState] = React.useState(
		{
			isLoading: false,
			hasError: false,
			data: [],
		}
	)

	const optionsFetch = {
		method: "GET",
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	}

	React.useEffect(() => {
		const getData = async () => {
			try {
				setState({ ...state, hasError: false, isLoading: true })
				const res = await fetch(urlAPI_ingredient, optionsFetch)
				const { data, success } = await res.json()
				success && setState({ ...state, data, isLoading: false })
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