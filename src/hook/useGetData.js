import React from 'react'
import { urlAPI } from '../utils/constants'


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
				setState({ ...state, hasError: false, isLoading: true });
				const res = await fetch(urlAPI);
				const { data, success } = await res.json();
				if (success) {
					setState({ ...state, data, isLoading: false });
				}
				else console.log(data)
			} catch (error) {
				setState({ ...state, hasError: true, isLoading: false });
			}
		};

		getData()
		// eslint-disable-next-line
	}, [])

	return state
}

export default useGetData