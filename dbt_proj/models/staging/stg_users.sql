{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}
WITH

users_data AS (

    SELECT
        *
    FROM {{ source('employee', 'users') }}

)

select *
from users_data

