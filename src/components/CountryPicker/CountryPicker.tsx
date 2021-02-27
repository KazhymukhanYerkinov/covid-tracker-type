import React, { useState } from 'react';
import { NativeSelect, FormControl, CircularProgress } from '@material-ui/core';

import { fetchCountries } from '../../api';
import { ResponseCountryData } from '../../api/types';

import styles from './CountryPicker.module.css';

interface Props {
    handleCountryChange(e: any): void
}

const CountryPicker = ({ handleCountryChange }: Props): JSX.Element => {
    const [ fetchedCountries, setFetchedCountries ] = useState<ResponseCountryData>({} as ResponseCountryData);

    React.useEffect(() => {
        async function fetchAPI(): Promise<void> {
            const response = (await fetchCountries()) as ResponseCountryData;
            setFetchedCountries(response);
            console.log(response);
        }
        fetchAPI();
    }, []);

    if (!fetchedCountries.countries) {
        return <CircularProgress />
    }

    return (
        <FormControl className = {styles.formControl}>
            <NativeSelect
                defaultValue = ""
                onChange = {(e: React.ChangeEvent<HTMLSelectElement>) => 
                    handleCountryChange(e.target.value)}
            >
                <option value = ""> Global </option>
                {fetchedCountries.countries.map((country, i) => (
                    <option key = {i} value = {country.name}>
                        { country.name }
                    </option>
                ))}

            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;