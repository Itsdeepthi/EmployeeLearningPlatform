
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC_staging.stg_userregisters
         as
        (

WITH

userreg_data AS (

    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC.userregisters

)

select *
from userreg_data
        );
      
  