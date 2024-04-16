
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC.sql_skills
         as
        (

WITH

skills_data AS (

    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC.skills

)

select *
from skills_data
        );
      
  