import React from 'react'
import { baseUrl } from '../utils/constants'

const useGetData = () => {
	const [state, setState] = React.useState(
		{
			isLoading: false,
			hasError: false,
			data: [],
		}
	)

	React.useEffect(() => {
		const getData = async () => {
			try {
				setState({ ...state, hasError: false, isLoading: true })
				const res = await fetch(`${baseUrl}/ingredients`)
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
