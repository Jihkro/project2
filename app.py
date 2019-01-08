import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

#from etl import perform_etl

#perform_etl()

app = Flask(__name__)


#################################################
# Database Setup
#################################################
#engine = create_engine('sqlite://', echo=False)

#disaster_final.to_sql('disasters', con=engine)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///static/db/disasterdb.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

"""# Save references to each table
Samples_Metadata = Base.classes.sample_metadata
Samples = Base.classes.samples
"""

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/debugtest")
def debug():
    """This is for making sure connection to database is correct"""
    df = pd.read_sql_query("SELECT * FROM DISASTERS", db.session.bind)
    data = {"FIPS Codes": df['FIPS Code'].values.tolist(), "Begin Dates":df['Incident Begin Date'].values.tolist()}
    return jsonify(data)

@app.route("/county/<params>")
def countyRoute(params):
    if params[0:5]=="00000":
        return "No Data"
    multiple = False
    query = "SELECT *, COUNT(1) FROM DISASTERS WHERE "
    if params[0]=="1":
        query = query + "`Incident Type` = 'Hurricane' "
        multiple = True
    if params[1]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Earthquake' "
    if params[2]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Tornado' "
    if params[3]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Wildfire' "
    if params[4]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Flood' "

    query = query + "AND `Incident Begin Date` >= " + params[5:9] + " AND `Incident Begin Date` <= " + params[10:14]
    query = query + " GROUP BY `FIPS Code`"
    df = pd.read_sql_query(query, db.session.bind)
    data = dict(zip(df['FIPS Code'].values.tolist(), df['COUNT(1)'].values.tolist()))
    return jsonify(data)


@app.route("/state/<params>")
def stateRoute(params):
    if params[0:5]=="00000":
        return "No Data"
    multiple = False
    query = "SELECT *, COUNT(1) FROM (SELECT * FROM DISASTERS WHERE "
    if params[0]=="1":
        query = query + "`Incident Type` = 'Hurricane' "
        multiple = True
    if params[1]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Earthquake' "
    if params[2]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Tornado' "
    if params[3]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Wildfire' "
    if params[4]=="1":
        if multiple== True:
            query = query + "OR "
        query = query + "`Incident Type` = 'Flood' "

    query = query + "AND `Incident Begin Date` >= " + params[5:9] + " AND `Incident Begin Date` <= " + params[10:14]
    query = query + " GROUP BY `Disaster Number`) GROUP BY `State Code`"
    df = pd.read_sql_query(query, db.session.bind)
    data = dict(zip(df['State Code'].values.tolist(), df['COUNT(1)'].values.tolist()))
    return jsonify(data)





if __name__ == "__main__":
    app.run()
