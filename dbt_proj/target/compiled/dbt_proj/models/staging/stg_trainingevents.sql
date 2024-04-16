

WITH

required_fields AS (

    SELECT
    *
    FROM EMPLOYEE_LEARNING.PUBLIC.trainingevents

),

training_events_data AS (

    SELECT 

        _ID,
        TITLE,
        DOMAIN,
        CAST(DATE AS DATE) AS DATE,
        DURATION,
        TRAINERNAME,
        LOCATION,
        DESC,
        CAST(CAPACITY AS INT) AS CAPACITY,
        CAST(CURRENTCAPACITY AS INT) AS CURRENTCAPACITY

    FROM required_fields

)

SELECT * FROM training_events_data