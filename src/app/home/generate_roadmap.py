import pandas as pd

# Creating the Task List for the project
tasks = {
    "Sprint": [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
    "Module": ["Security", "Identity", "Auth", "Ingestion", "AI", "Connect", "UI", "Storage", "Flow", "Automation", "Final"],
    "Task Name": [
        "Biometric Splash Screen", 
        "Me-File Profile UI", 
        "NestJS Auth & Encryption",
        "OAuth2 Gmail Integration",
        "LLM Email Classifier",
        "Connections Dashboard",
        "Document Vault Grid",
        "PDF Metadata Extraction",
        "Review-Draft Split View",
        "Puppeteer Portal Automator",
        "Agent Reasoning Log"
    ],
    "Tech Stack": [
        "Ionic/Capacitor", 
        "Angular", 
        "NestJS/MongoDB", 
        "Node.js/OAuth", 
        "OpenAI API", 
        "Ionic/Angular", 
        "Angular", 
        "NestJS/OCR", 
        "Angular/Signals", 
        "Puppeteer/NestJS",
        "WebSockets/Angular"
    ],
    "Priority": ["High", "High", "High", "Critical", "Medium", "Medium", "High", "Medium", "Critical", "Critical", "Low"]
}

df = pd.DataFrame(tasks)
df.to_excel("agentic_life_admin_roadmap.xlsx", index=False)