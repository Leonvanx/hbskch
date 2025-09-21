# 接口名称
1. 分页接口：/tech/api/demands/search POST
   返回列表项：
   		{
			"contactPerson": "李四",
			"contactPhone": 13900139000,
			"createTime": "2023-01-01T10:00:00",
			"demandDetails": "详细的改造需求和技术要求",
			"demandName": "智能生产线改造",
			"demandOverview": "需要对现有生产线进行智能化改造",
			"demandTime": "2023-06-01",
			"demandUnit": "某某制造有限公司",
			"email": "lisi@example.com",
			"expectedEffect": "提高生产效率30%，降低人工成本50%",
			"expectedInvestment": 1000000,
			"field": "智能制造",
			"id": 1,
			"isDeleted": 0,
			"remarks": "急需改造，希望尽快对接",
			"serialNumber": "D001",
			"technicalParameters": "精度要求0.1mm，速度要求100件/分钟",
			"updateTime": "2023-01-01T10:00:00"
		}
2. 创建接口：/tech/api/demands POST
  参数：
  {
  "contactPerson": "李四",
  "contactPhone": 13900139000,
  "createTime": "2023-01-01T10:00:00",
  "demandDetails": "详细的改造需求和技术要求",
  "demandName": "智能生产线改造",
  "demandOverview": "需要对现有生产线进行智能化改造",
  "demandTime": "2023-06-01",
  "demandUnit": "某某制造有限公司",
  "email": "lisi@example.com",
  "expectedEffect": "提高生产效率30%，降低人工成本50%",
  "expectedInvestment": 1000000,
  "field": "智能制造",
  "id": 1,
  "isDeleted": 0,
  "remarks": "急需改造，希望尽快对接",
  "serialNumber": "D001",
  "technicalParameters": "精度要求0.1mm，速度要求100件/分钟",
  "updateTime": "2023-01-01T10:00:00"
}
3. 导出接口：/tech/api/demands/export/all GET
4. 导入Excel接口：/tech/api/demands/import POST
5. 更新接口：/tech/api/demands/{id} PUT
    参数：
    id	成果供方ID
    demandDetails	更新后的成果供方数据
6. 删除接口：/tech/api/demands/{id} DELETE
    参数：
    id	成果供方ID



