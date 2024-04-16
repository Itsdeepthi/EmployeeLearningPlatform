{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}

WITH

skills_data AS (

    SELECT
        *
    FROM {{ source('employee', 'skills') }}

),

skill_data AS (

    SELECT 

        _ID,
       USERID,
       SKILL,
        CAST(EXPERIENCE AS INT) AS EXPERIENCE,
        CAST(STRENGTH AS INT) AS STRENGTH

    FROM skills_data

)

select *
from skill_data