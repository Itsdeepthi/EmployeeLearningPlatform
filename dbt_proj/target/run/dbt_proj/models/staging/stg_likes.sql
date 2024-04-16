
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC_staging.stg_likes
         as
        (

WITH

likes_data AS (

    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC.likes

)

select *
from likes_data
        );
      
  