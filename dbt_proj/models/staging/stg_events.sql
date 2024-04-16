{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}

WITH

required_fields AS (

    SELECT
    *
    FROM {{ source('employee', 'events') }}

),

training_events_data AS (

    SELECT 

        _ID,
        TITLE,
        DOMAIN,
        TO_DATE(DATE, 'DD-MM-YYYY') AS DATE,
        DURATION,
        TRAINERNAME,
        LOCATION,
        DESC,
        CAST(CAPACITY AS INT) AS CAPACITY,
        CAST(CURRENTCAPACITY AS INT) AS CURRENTCAPACITY

    FROM required_fields

)

SELECT * FROM training_events_data


