import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import os

print("Starting model building process with Spotify Tracks DB dataset...")

# --- Setup Paths ---
script_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(script_dir, 'SpotifyFeatures.csv')
public_dir = os.path.join(script_dir, '..', 'public')

# --- NEW: Define path for the chunked similarity vectors ---
vectors_dir = os.path.join(public_dir, 'similarity_vectors')

artist_list_path = os.path.join(public_dir, 'artist_list.json')


# --- 1. Load and Process Data ---
print(f"Loading dataset from: {data_path}")
try:
    df = pd.read_csv(
        data_path,
        usecols=['artist_name', 'genre']
    )
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print(f"\nERROR: SpotifyFeatures.csv not found at {data_path}")
    print("Please download it from https://www.kaggle.com/datasets/zaheenhamidani/ultimate-spotify-tracks-db")
    print("And place 'SpotifyFeatures.csv' in the 'model' directory.\n")
    exit()
except ValueError as e:
    print(f"\nERROR loading CSV: {e}")
    print("Please ensure the CSV file has the columns 'artist_name' and 'genre'.")
    exit()

df.dropna(subset=['artist_name', 'genre'], inplace=True)

print("Processing artist genres...")
artist_features = df.groupby('artist_name')['genre'].apply(lambda x: ' '.join(x.unique())).reset_index()
artist_features.rename(columns={'genre': 'features'}, inplace=True)

print(f"Found {len(artist_features)} unique artists with genre data.")

# --- 2. Build TF-IDF Model ---
print("Building TF-IDF vectorizer...")
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(artist_features['features'])

# --- 3. Calculate Cosine Similarity ---
print("Calculating cosine similarity matrix...")
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
print("Similarity matrix calculated.")

# --- 4. Save Model Artifacts (Chunked) ---
artist_list = artist_features['artist_name'].tolist()

print(f"Saving artist list to {artist_list_path}...")
os.makedirs(public_dir, exist_ok=True)
with open(artist_list_path, 'w') as f:
    json.dump(artist_list, f)

# --- NEW: Save similarity vectors as individual files ---
print(f"Saving similarity vectors to {vectors_dir}...")
os.makedirs(vectors_dir, exist_ok=True)

for i, vector in enumerate(cosine_sim):
    vector_path = os.path.join(vectors_dir, f'{i}.json')
    with open(vector_path, 'w') as f:
        # Convert numpy array to list for JSON serialization
        json.dump(vector.tolist(), f)

print(f"\nModel building complete! Saved {len(cosine_sim)} vector files.")
print("Artifacts have been saved to the /public directory.")
