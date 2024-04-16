
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC.stg_trainevents
         as
        (

WITH

required_fields AS (

    SELECT
    *
    FROM EMPLOYEE_LEARNING.PUBLIC.trainevents

),

train_events_data AS (

    SELECT 

        _ID,
        TITLE,
        DOMAIN,
        CAST(DATE AS DATE) AS DATE,
        DURATION,
        TRAINERNAME,
        LOCATION,
        DESC,

    FROM required_fields

)

SELECT * FROM train_events_data
        );
      
  