import boto3
import pandas as pd

def fetch_openaq_raw_data_by_data(str_date, bucket_name, folder_name, zone):
    s3 = boto3.resource(
        service_name='s3',
        region_name=zone
    )
    list_df = []
    bucket = s3.Bucket(bucket_name)
    # date format yyyy-mm-dd
    folder_path = folder_name + '/' + str_date + '/'
    objs = list(bucket.objects.filter(Prefix=folder_path))
    for i in range(0, len(objs)):
        print(objs[i].key)
        s3file_obj = s3.Bucket(bucket_name).Object(objs[i].key).get()
        df = pd.read_json(s3file_obj['Body'], lines=True)
        print("New data shape:", df.shape)
        # print(df.head(2))
        list_df.append(df)
    print("Total data files fetched:", len(list_df))
    combined_data = pd.concat(list_df)
    # save the collected data
    combined_data.to_csv("openaqdata_" + str_date + ".csv", encoding='utf-8', index=False)
    return combined_data


