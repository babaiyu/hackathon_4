import csv
import pymysql
import os

# connection = pymysql.connect(host='http://101.50.0.53:8183/index.php',
#   user='keketik',
#   passwd='keketik_hackathon4',
#   db='db_keketik'
# )
# cursor = connection.cursor()

import xlrd

loc = ("./Database Geosite RL-UGGp.xls")

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)

sheet.cell_value(0, 0)

for i in range(1,10):
  site = sheet.row_values(i)
  # print(site[0], " - ", site[1], " - ", site[2])
  print("{\n", '"name_product": "{0}",\n "description": "{1}",\n "place": "{2}",\n "url_photo": "www.picture.id"\n'.format(site[0], site[1], site[2]), "}")

