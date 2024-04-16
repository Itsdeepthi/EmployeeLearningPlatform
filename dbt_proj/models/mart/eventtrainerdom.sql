{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}

WITH

stg_users AS (
    SELECT
        *
    FROM {{ ref('stg_users') }}
),

stg_events AS (
    SELECT
        *
    FROM {{ ref('stg_events') }}
),

stg_userregisters AS (
    SELECT
        *
    FROM {{ ref('stg_userregisters') }}
),

event_by_domain_trainer AS (
    SELECT 
    t.DOMAIN,
    t.TRAINERNAME,
    t.TITLE,
    COUNT(DISTINCT u._ID) AS User_Count
FROM 
    stg_events t
JOIN 
    stg_userregisters ur ON t._ID = ur.EVENTID
JOIN 
    stg_users u ON ur.USERID = u._ID
GROUP BY 
    t.DOMAIN,
    t.TRAINERNAME,
    t.TITLE
ORDER BY 
    t.DOMAIN,
    User_Count DESC

)

SELECT * FROM event_by_domain_trainer