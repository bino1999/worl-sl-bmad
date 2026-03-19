# Step 2: Context Discovery

## PURPOSE
- Gather all relevant context documents and information needed for architectural decision making.
- Ensure both architectural and domain context are available before proceeding.

## EXECUTION RULES
- 🛑 Do not proceed to the next step until context discovery is complete and user confirms.
- 📖 Read all referenced planning artifacts (PRD, product brief, user journeys, etc.)
- 💬 Ask the user if there are any additional documents or context to include (e.g., technical constraints, legacy systems, integration points).
- ✅ Summarize discovered context and present to the user for confirmation.
- 🚫 Do not generate architectural decisions yet—focus only on context gathering.

## CONTEXT DISCOVERY SEQUENCE

1. List all available planning and knowledge artifacts in:
   - {planning_artifacts}/**
   - {output_folder}/**
   - {project_knowledge}/**
2. Identify and load key documents (PRD, product brief, requirements, user journeys, etc.).
3. Ask the user if there are any additional documents or special context to include.
4. Summarize all discovered context for user review.
5. Wait for explicit user confirmation before proceeding to the next step.

## YOUR TASK
- List and summarize all relevant context documents.
- Ask the user for any missing or special context.
- Present a summary and await user confirmation to continue.
