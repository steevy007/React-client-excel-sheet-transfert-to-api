import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.libelle}</th>
            <th>{individualExcelData.description}</th>
            <th>{individualExcelData.image}</th>
            <th>{individualExcelData.categorie_id}</th>
        </>
    )
}
