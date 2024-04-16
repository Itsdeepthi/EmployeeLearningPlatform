{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}

WITH

userreg_data AS (

    SELECT
        *
    FROM {{ source('employee', 'userregisters') }}

)

select *
from userreg_data
