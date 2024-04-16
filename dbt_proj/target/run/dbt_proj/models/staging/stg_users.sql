
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC_staging.stg_users
         as
        (
WITH

users_data AS (

    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC.users

)

select *
from users_data
        );
      
  