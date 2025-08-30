from flask import Flask, request, jsonify
from flask_cors import CORS # Import CORS
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app) # this will enable CORS for all routes

df = pd.read_csv("songs.csv")
to_cluster = ['Loudness', 'Tempo', 'Acousticness']
X = df[to_cluster].copy()
X.fillna(X.mean(), inplace=True) # Handle missing values
original_data = df[['Artist', 'Track']].copy()
scaler = MinMaxScaler()
Xscaled = scaler.fit_transform(X)
Xscaled_df = pd.DataFrame(Xscaled, columns=to_cluster)

# training KMeans model
optimal_k = 3
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init='auto')
kmeans.fit(Xscaled_df)
original_data['Cluster'] = kmeans.labels_

def recommend_songs(track_nm, artist_nm, data, num_recs = 5):
    try:
        song_cluster = data[(data['Track'] == track_nm) & (data['Artist'] == artist_nm)]['Cluster'].iloc[0]
        recommendations = data[data['Cluster'] == song_cluster]
        recommendations = recommendations[~((recommendations['Track'] == track_nm) & (recommendations['Artist'] == artist_nm))]

        print(f'Recommendations for {track_nm} by {artist_nm} from cluster {song_cluster}: ')
        if recommendations.empty:
            print('No similar song found')
        else:
            if len(recommendations) < num_recs:
                num_recs = len(recommendations)
            return recommendations.sample(n=num_recs)
    except IndexError:
        return f"Error: {track_nm} by {artist_nm} not found in dataset"

@app.route('/recommend', methods=['GET'])
def recommend():
    track_nm = request.args.get('track_nm')
    artist_nm = request.args.get('artist_nm')
    recommendations = recommend_songs(track_nm, artist_nm, original_data)
    return jsonify(recommendations.to_dict(orient='records'))   # Convert DataFrame to list of dicts for JSON response

if __name__ == '__main__':
    app.run(debug=True, port=5000)