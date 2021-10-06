# Unused Theme File Pruner

Install:
```
cd pruner
yarn install
```

Usage:
```
# from root directory
node pruner

# dry run, log actions only
node pruner --dry
```

Pruner will log all active templates and deletions to `prune.log` on every execution.  If the `--dry` flag is used then the logging will be the only action.