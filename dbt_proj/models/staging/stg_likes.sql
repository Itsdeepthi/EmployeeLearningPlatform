{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}

WITH

likes_data AS (

    SELECT
        *
    FROM {{ source('employee', 'likes') }}

)

select *
from likes_data
