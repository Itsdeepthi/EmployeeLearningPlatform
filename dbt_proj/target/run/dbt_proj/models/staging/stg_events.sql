
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC_staging.stg_events
         as
        (

WITH

required_fields AS (

    SELECT
    *
    FROM EMPLOYEE_LEARNING.PUBLIC.events

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
        );
      
  