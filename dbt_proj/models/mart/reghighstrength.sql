{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}

WITH

stg_skills AS (
    SELECT
        *
    FROM {{ ref('stg_skills') }}
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

events_with_high_skill_users AS (
    SELECT
        te._ID AS Event_ID,
        te.TITLE AS Event_Title,
        s.STRENGTH AS Skill_Strength,
        s.SKILL AS Skill,
        COUNT(ur._ID) AS Registrations_Count
    FROM
        events te
    JOIN
        userregisters ur ON te._ID = ur.EVENTID
    JOIN
        skills s ON ur.USERID = s.USERID
    WHERE
        s.STRENGTH IN (4, 5)
    GROUP BY
        te._ID,
        te.TITLE,
        s.SKILL,
        s.STRENGTH
    ORDER BY
        Registrations_Count DESC
)

SELECT * FROM events_with_high_skill_users
