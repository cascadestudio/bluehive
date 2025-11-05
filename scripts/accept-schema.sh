#!/bin/sh
# Script to accept schema push manually
# Run this once to push the schema, then it won't ask again

echo "To accept the schema push, run:"
echo ""
echo "  docker-compose -f docker-compose.dev.yml exec app sh"
echo ""
echo "Then in the container, when you see the prompt, type 'y' and press Enter"
echo ""
echo "Or, if the container is already running, you can try:"
echo "  docker attach bluehive-app-1"
echo "  (then type 'y' and press Enter)"
echo "  (press Ctrl+P then Ctrl+Q to detach)"

